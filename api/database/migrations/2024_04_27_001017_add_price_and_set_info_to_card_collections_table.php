<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceAndSetInfoToCardCollectionsTable extends Migration
{
    public function up()
    {
        Schema::table('card_collections', function (Blueprint $table) {
            $table->string('set_name')->nullable()->after('name');
            $table->string('set_series')->nullable()->after('set_name');
            $table->decimal('price_low', 8, 2)->nullable()->after('set_series');
            $table->decimal('price_mid', 8, 2)->nullable()->after('price_low');
            $table->decimal('price_high', 8, 2)->nullable()->after('price_mid');
            $table->decimal('price_market', 8, 2)->nullable()->after('price_high');
            // Ajoutez ici les autres champs que vous souhaitez inclure.
        });
    }

    public function down()
    {
        Schema::table('card_collections', function (Blueprint $table) {
            $table->dropColumn(['set_name', 'set_series', 'price_low', 'price_mid', 'price_high', 'price_market']);
            // Assurez-vous de lister ici tous les nouveaux champs ajoutés dans up().
        });
    }
}
