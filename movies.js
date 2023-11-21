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
        }

    },
     beforeCreate() {

            fetch(url, option)
                .then(response => response.json())
                .then(data => {
                    this.movies = data.movies
                    this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                    console.log(this.movies)
                    console.log(this.genres)
                    


                })
                .catch(error => console.log(error))
    }
}
const app = createApp(optionsVue)
app.mount('#app')