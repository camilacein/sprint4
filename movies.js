const url = "https://moviestack.onrender.com/api/movies"
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
            movies: [],
            genres: [],
            selected:"all",
            search:"",
            moviesFiltradas:[],
            favs:[],
                }

    },
     beforeCreate() {

            fetch(url, option)
                .then(response => response.json())
                .then(data => {
                    this.movies = data.movies
                    this.moviesFiltradas = this.movies
                    this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                    
                 
                    


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
        fav(movie){
            let favoritas = JSON.parse(localStorage.getItem('favs')) || []
            console.log(favoritas)
            const peliFav = favoritas.some( favorita => favorita.id === movie.id)
      
          
            if(!peliFav){
            favoritas.push({id: movie.id})
          
            
            } else {
              if (peliFav){
                favoritas = favoritas.filter(favorita => favorita.id !== movie.id)
            
                
              }
            }
            localStorage.setItem('favs', JSON.stringify(favoritas))}
    },
}
const app = createApp(optionsVue)
app.mount('#app')