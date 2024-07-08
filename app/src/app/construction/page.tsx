"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedinIn, faInstagram, faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";
import ClientLayout from '@/components/ClientLay';
import styled from 'styled-components';

const ConstructionPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 80 ? 80 : prev + 1));
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <ClientLayout>
      <Head>
        <title>En Cours de Construction</title>
      </Head>
      <Background>
        <Container>
          <Top>
            <Hr />
            <WebsiteName>Kolector's</WebsiteName>
            <Hr />
          </Top>
          <Heading>En Cours de Construction</Heading>
          <SubHeading>Chargement</SubHeading>
          <ProgressWrapper>
            <Progress style={{ width: `${progress}%` }}>
              <ProgressSpan>{progress}%</ProgressSpan>
            </Progress>
          </ProgressWrapper>
          <SocialIcons>
            <a href="#your-github-profile"><FontAwesomeIcon icon={faGithub} style={styles.icon} /></a>
            <a href="#your-linkedin-page"><FontAwesomeIcon icon={faLinkedinIn} style={styles.icon} /></a>
            <a href="#your-youtube-page"><FontAwesomeIcon icon={faYoutube} style={styles.icon} /></a>
          </SocialIcons>
        </Container>
      </Background>
    </ClientLayout>
  );
};

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #171925, #e73343);
`;

const Container = styled.div`
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10%;
  margin-top: -30px; 

  @media screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  font-weight: 900;
  margin: 10px;
`;

const WebsiteName = styled.p`
  font-size: 20px;
  width: 160px;
  text-align: center;
`;

const Hr = styled.hr`
  width: 100px;
  color: white;
  border-radius: 5px;
  margin: 0 15px;
`;

const Heading = styled.h1`
  font-size: 60px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 2px;

  @media screen and (max-width: 640px) {
    font-size: 50px;
  }

  @media screen and (max-width: 400px) {
    font-size: 30px;
  }
`;

const SubHeading = styled.h3`
  margin-bottom: 10px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background: #2f2b2bc7;
  display: flex;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const Progress = styled.div`
  height: 10px;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
`;

const ProgressSpan = styled.span`
  color: white;
  position: relative;
  top: 13px;
  left: 25px;
  font-weight: 800;
`;

const SocialIcons = styled.div`
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const styles = {
  icon: {
    fontSize: '35px',
    margin: '10px',
  },
};

export default ConstructionPage;
