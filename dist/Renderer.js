class Renderer{
    constructor(){}

    renderDbData(oldCities){
        const source = $('#store-template-oldCity').html();
        const template = Handlebars.compile(source);
        const newHTML = template({oldCities});
        $('.oldCities').empty().append(newHTML);
    }

    renderData(cities){
        const source = $('#store-template-newCity').html();
        const template = Handlebars.compile(source);
        const newHTML = template(cities);
        $('.newCities').empty().append(newHTML);
    }
}


