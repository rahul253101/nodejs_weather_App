const forecast = document.querySelector('#forecast')
const address = document.querySelector('#address')
const form = document.querySelector('form')
const data = document.querySelector('input')
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    if (data.value){
        fetch(`http://localhost:3000/weather?address=${data.value}`).then((response)=>{
        address.innerHTML = 'Loding...'
        response.json().then((data)=>{
            if(data.error){
                address.innerHTML = data.error
                forecast.innerHTML = ''
                // return console.log(data.error)
            }else{
                address.innerHTML = data.address
                forecast.innerHTML = data.forecast
                // console.log(data)
            }


        })
    data.value = ''

})

    }


})
