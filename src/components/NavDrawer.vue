<template>
    <v-system-bar color="indigo darken-3"></v-system-bar>
    <v-app-bar color="indigo accent-4" dark prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <v-list-item>
                    <v-list-item-title>
                        <router-link class="text-decoration-none" v-if="home" to="/import">Import</router-link>
                        <router-link class="text-decoration-none" v-else to="/">Home</router-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-list-group value="Addresses">
                <template v-slot:activator="{props}">
                    <v-list-item v-bind="props" prepend-icon="mdi-map-marker-circle" title="Addresses">
                    </v-list-item>
                </template>
                <v-list-group v-for="(state, index) in states" value="{{state.state}}" :key="state.state" :index="index">
                    <template v-slot:activator="{props}">
                        <v-list-item v-bind="props">{{state.state}}</v-list-item>
                    </template>
                    <v-list-item v-for="listing in listings" :key="listing.id" :title="listing.address" :value="listing.listing">
                    </v-list-item>
                </v-list-group>
                <v-list-item v-for="state in states" :key="state.state">
                    <v-list-item-content>
                        <v-list-item-title v-text="state.state"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <!-- -->
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'NavDrawer',
    props: {
        home: false
    },
    data: () => ({
        drawer: false,
        group: null,
        states: [
            { "state": "IL" }, { "state": "TN" }, { "state": "OH" }, { "state": "IA" }, { "state": "MO" }
        ],
        listings: [{ "listing": "8143 S Sangamon St, Chicago, IL 60620", "address": "8143 S Sangamon St", "state": "IL", "id": 1 }, { "listing": "1090 Diagonal Rd, Akron, Ohio 44320", "address": "1090 Diagonal Rd", "state": "OH", "id": 2 }, { "listing": "1106 29th Ave, Rock Island, IL 61201", "address": "1106 29th Ave", "state": "IL", "id": 3 }, { "listing": "13806 Coit Rd, Cleveland, OH 44110", "address": "13806 Coit Rd", "state": "OH", "id": 4 }, { "listing": "15711 Grovewood Ave, Cleveland, Ohio 44110", "address": "15711 Grovewood Ave", "state": "OH", "id": 5 }, { "listing": "3139 West Blvd, Cleveland, OH 44111", "address": "3139 West Blvd", "state": "OH", "id": 6 }, { "listing": "3435-3437 Alberta St, Saint Louis, MO 63118", "address": "3435-3437 Alberta St", "state": "MO", "id": 7 }, { "listing": "428 Cross St, Akron, OH 44311", "address": "428 Cross St", "state": "OH", "id": 8 }, { "listing": "4551 Sunny View Dr, Memphis, TN 38127", "address": "4551 Sunny View Dr", "state": "TN", "id": 9 }, { "listing": "5541 S Peoria St, Chicago, IL 60621", "address": "5541 S Peoria St", "state": "IL", "id": 10 }, { "listing": "621 E Le Claire Rd, Eldridge, IA 52748", "address": "621 E Le Claire Rd", "state": "IA", "id": 11 }, { "listing": "640 N Cicero Ave, Chicago, IL 60644", "address": "640 N Cicero Ave", "state": "IL", "id": 12 }, { "listing": "755 Robinwood Dr, Florissant, MO 63033", "address": "755 Robinwood Dr", "state": "MO", "id": 13 }, { "listing": "9423 Denison Ave, Cleveland, OH 44102", "address": "9423 Denison Ave", "state": "OH", "id": 14 }, { "listing": "9510 Silk Ave, Cleveland, Ohio 44102, Cleveland, Ohio 44109", "address": "9510 Silk Ave", "state": "OH", "id": 15 }, { "listing": "Ohio 3 Property Package, Akron, Ohio 44117", "address": "Ohio 3 Property Package", "state": "OH", "id": 16 }],
        cruds: [
        ],
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>