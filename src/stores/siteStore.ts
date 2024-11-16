import { defineStore } from 'pinia'
import axios from 'axios'

interface Site {
    id: string
    name: string
    type: string
    production: boolean
    longitude: number
    latitude: number
}

export const useSiteStore = defineStore('site', {
    state: () => ({
        sites: [] as Site[],
        loading: false,
        error: null as string | null,
}),

actions: {
    async fetchSites() {
        this.loading = true
        try {
            const response = await axios.get<Site[]>('http://10.21.105.75:45456/api/Sites')
            this.sites = response.data
        } catch (err) {
            this.error = "Erreur lors de la récupération des sites"
            console.error(err)
        } finally {
            this.loading = false
        }
    }
},

getters: {
    getSites: (state) => state.sites,
    isLoading: (state) => state.loading,
    getSitesByType: (state) => (type: string) => {
    return state.sites.filter(site => site.type === type)
    },
    getProductionSites: (state) => {
        return state.sites.filter(site => site.production)
    }
}
}) 