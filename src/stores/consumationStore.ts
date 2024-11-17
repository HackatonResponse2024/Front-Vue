import { defineStore } from 'pinia'

interface ConsumationReport {
  autoConsumationRate: number
  autoProductionRate: number
  months: string[]
  valuableProduction: number[]
  surplus: number[]
}

export const useConsumationStore = defineStore('consumation', {
  state: () => ({
    reports: [] as ConsumationReport[]
  }),
  
  getters: {
    sortedReports: (state) => {
      return [...state.reports].sort((a, b) => b.autoConsumationRate - a.autoConsumationRate)
    }
  },

  actions: {
    async fetchConsumationReport(coordinates: { lng: number, lat: number }) {
      try {
        const response = await fetch('https://response-ejf9djema4gaanex.francecentral-01.azurewebsites.net/api/Consumation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            longitude: coordinates.lng,
            latitude: coordinates.lat,
            power: 1238
          })
        })

        if (!response.ok) throw new Error('Erreur réseau')
        
        const report = await response.json()
        this.reports.push(report)
        this.reports.sort((a, b) => b.autoConsumationRate - a.autoConsumationRate)
        return report
      } catch (error) {
        console.error('Erreur lors de l\'appel API:', error)
        throw error
      }
    }
  }
}) 