// src/app/collection/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientLayout from '@/components/ClientLay';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sets, setSets] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://api.kolectors.live/api/collections', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('API Response:', response.data);

      const detailedCards = await Promise.all(response.data.map(async (card) => {
        await new Promise(resolve => setTimeout(resolve, 200)); 
        const cardResponse = await axios.get(`https://api.pokemontcg.io/v2/cards/${card.pokemon_card_id}`);
        const cardData = cardResponse.data.data;
        return { ...card, details: cardData };
      }));

      setCollection(detailedCards);
      setFilteredCollection(detailedCards);
      extractSetsAndExtensions(detailedCards);
      const total = calculateTotalValue(detailedCards);
      setTotalValue(total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching collection data:', error);
      setLoading(false);
      setError('Failed to fetch collection data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotalValue = (cards) => {
    return cards.reduce((total, card) => total + card.value, 0);
  };

  const extractSetsAndExtensions = (cards) => {
    const sets = [...new Set(cards.map(card => card.details.set.name))];
    const extensions = [...new Set(cards.map(card => card.details.set.series))];
    setSets(sets);
    setExtensions(extensions);
  };

  const deleteCard = async (userCardId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette carte de votre collection ?')) {
      try {
        const response = await axios.delete(`https://api.kolectors.live/api/collections/${userCardId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }
        });

        if (response.status === 204) {
          alert("Carte supprimée de votre collection !");
          fetchData();
        }
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Impossible de supprimer la carte. Veuillez réessayer.');
      }
    }
  };

  const filterBySet = (set) => {
    if (set) {
      const filtered = collection.filter(card => card.details.set && card.details.set.name === set);
      setFilteredCollection(filtered);
    } else {
      setFilteredCollection(collection);
    }
    setSelectedSet(set);
  };

  const filterByExtension = (extension) => {
    if (extension) {
      const filtered = collection.filter(card => card.details.set && card.details.set.series === extension);
      setFilteredCollection(filtered);
    } else {
      setFilteredCollection(collection);
    }
    setSelectedExtension(extension);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderCard = (card) => (
    <div className="card" key={card.id}>
      <div className="card-container" onClick={() => openModal(card.details.images.large)}>
        <img src={card.details.images.large} alt={card.details.name} className="card-image" />
        <button className="delete-button" onClick={() => deleteCard(card.id)}>✕</button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <p>Chargement de la collection...</p>
      </div>
    );
  }

  return (
    <ClientLayout>
      <div className="min-h-screen flex flex-col items-center bg-[#302F45] p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Ma Collection</h1>
        <div className="flex gap-4 mb-6">
          <select onChange={(e) => filterBySet(e.target.value)} value={selectedSet} className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2">
            <option value="">Filtrer par Set</option>
            {sets.map(set => (
              <option key={set} value={set}>{set}</option>
            ))}
          </select>
          <select onChange={(e) => filterByExtension(e.target.value)} value={selectedExtension} className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2">
            <option value="">Filtrer par Extension</option>
            {extensions.map(extension => (
              <option key={extension} value={extension}>{extension}</option>
            ))}
          </select>
        </div>
        <div className="mb-6 text-white">
          <p>Valeur totale : ${totalValue.toFixed(2)}</p>
          <p>Cartes : {collection.length}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {filteredCollection.map(card => renderCard(card))}
        </div>
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-lg">
              <button className="absolute top-2 right-2 text-black" onClick={closeModal}>&times;</button>
              <img src={selectedImage} alt="Carte" className="modal-image" />
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default CollectionPage;
