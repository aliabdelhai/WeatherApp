class Model {
    constructor() {
        this.cityData = []
        this.currentCity = {}
    }

    async getDataFromDB() {
        const response = await $.get('/cities')
        this.cityData = response
    }

    async getCityData(cityName) {
        const response = await $.get(`/city/${cityName}`)
        this.currentCity = response
    }

    async saveCity() {
        const response = await $.post('/city', this.currentCity)
        this.cityData.push(response)
    }

    async removeCity(cityName) {
        const cityToDelete = await $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
        })

        const name = cityToDelete.name
        const index = this.cityData.findIndex(o => o.name === name)
        if (index !== -1) this.cityData.splice(index, 1);
    }
}