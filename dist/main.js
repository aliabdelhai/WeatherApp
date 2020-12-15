const model = new Model()
const render = new Renderer()

const loadPage = async function(){
    await model.getDataFromDB()
    render.renderDbData(model.cityData)
}

loadPage()

const handleSearch = async function(){
    const cityName = $('#cityName').val()
    await model.getCityData(cityName)
    render.renderData(model.currentCity)
}

$('.weather').on('click', '.delete', async function(){
    const cityName =  $(this).closest('.oldCity').find('.cityName').text()
    await model.removeCity(cityName)
    render.removeCity($(this))
})

$('.weather').on('click', '.Add', async function(){
    await model.saveCity()
    render.renderDbData(model.cityData)
})