const url = "https://moviestack.onrender.com/api/movies"
const key = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const option = {
    headers: {
        'x-api-key': key
    }
}
const search = location.search
const params = new URLSearchParams(search)
 const id = params.get("id")

const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            movies: [],
            genres: [],
            selected:"all",
            search:"",
            moviesFiltradas:[],
            filtrarId:[],
        }

    },
     beforeCreate() {

            fetch(url, option)
                .then(response => response.json())
                .then(data => {
                    this.movies = data.movies
                    this.moviesFiltradas = this.movies
                    this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                    this.filtrarId= this.movies.find(movie => movie.id == id)
                 
                    


                })
                .catch(error => console.log(error))
    },
    methods: {
        searchs(event){
            this.search = event.target.value
            this.filtrar()
        },
        selec(event){
        this.selected = event.target.value
        this.filtrar()
        },
        filtrar(){
            this.moviesFiltradas = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase())&&(this.selected ==="all"||movie.genres.includes(this.selected)))
        },
    },
}
const app = createApp(optionsVue)
app.mount('#app')