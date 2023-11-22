const url = "https://moviestack.onrender.com/api/movies/"
const key = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const option = {
    headers: {
        'x-api-key': key
    }
}
const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            id: null,
            pelis:[],
        }

    },
    beforeCreate() {
        const search = location.search
        const params = new URLSearchParams(search)
        this.id = params.get("id")
        // console.log(this.id)

        fetch(url+this.id, option)
            .then(response => response.json())
            .then(data => {
                this.pelis=data
                console.log(this.id)
                console.log(this.pelis)

            




            })
            .catch(error => console.log(error))

    },
    computed:{
        formatDate(){
            const options = {day:'numeric', month:'long', year:'numeric'}
            const release = new Date(this.pelis.release_date)
            return release.toLocaleDateString("es-ES",options)
    }
}}
const app = createApp(optionsVue)
app.mount('#app')