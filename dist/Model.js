class Model{
    constructor(){
        this.cityData = []
    }

    async getDataFromDB(){
        await $.get('/cities', response => {
            this.cityData = response
        })
    }

    async getCityData(cityName){
        await $.get(`/city/${cityName}`, response =>  {
            this.cityData.push(response)
        })
    }

    async saveCity(city){
        await $.post('/city', city, response => {
            this.cityData.push(response)
        })
    }

    async removeCity(cityName){
        await $.ajax({
                url: `/city/${cityName}`,
                method: "DELETE",
                success: (cityToDelete) => {
                    const name = cityToDelete.name
                    const index = this.cityData.findIndex(o => o.name === name)
                    if (index !== -1) this.cityData.splice(index, 1);    
                }
            })
    }
}