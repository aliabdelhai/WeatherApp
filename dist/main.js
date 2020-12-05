
const model = new Model()
const render = new Renderer()


const loadPage = async function(){
    await model.getDataFromDB()
    console.log(model.cityData)
    render.renderDbData(model.cityData)

}

loadPage()

const handleSearch = async function(){
    const cityName = $('#cityName').val()
    console.log(cityName)
    await model.getCityData(cityName)
    render.renderData(model.cityData[model.cityData.length - 1])
    model.cityData.splice([model.cityData.length - 1], 1)
}


$('.weather').on('click', '.delete', async function(){
    const cityName =  $(this).closest('.oldCity').find('.cityName').text()
    model.removeCity(cityName)
    $(this).closest('.oldCity').remove()
})


$('.weather').on('click', '.Add', async function(){
    console.log('haha')
    
    const name = $(this).closest('.newCity').find('.cityName').text()
    console.log(name)
    const temperature = parseFloat($(this).closest('.newCity').find('.temp').text())

    const condition = $(this).closest('.newCity').find('.cond').text()
    console.log(condition)
    const conditionPic = $(this).closest('.newCity').find('.condPic').attr('src')
    console.log(conditionPic)
    const city = {name, temperature, condition, conditionPic}
    console.log(city)
    await model.saveCity(city) 
    console.log(model.cityData)
    render.renderDbData(model.cityData)

    

})