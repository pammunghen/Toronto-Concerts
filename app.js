const app = new Vue({
    el: '#app',
    components: {
        ConcertView,
        ConcertCreate
    },
    computed: {
        venues() {
            const set = {};
            for (var i = 0; i < this.concerts.length; i++) {
                set[this.concerts[i].place.name] = true;
            }
            return Object.keys(set).sort();
        },
        filtered_concerts() {
            return this.concerts
                .filter(f => {
                    return f.name.toLowerCase().indexOf(this.search) !== -1
                })
                .sort((a, b) => {
                    if (a.name > b.name) return this.sort_modifier;
                    if (a.name < b.name) return this.sort_modifier * -1;
                    return 0;
                })
        },
        sort_btn_text() {
            return this.sort_modifier > 0 ? 'A-Z' : 'Z-A';
        }
    },
    data: {
        search: '',
        message: 'Schedule or View Concerts in Toronto, ON',
        concerts: [],
        sort_modifier: 1
    },
    created() {
        this.getConcerts();
    
        this.$root.$on('new_concert', (c) => {
            this.concerts.unshift(c);
        })
    },
    methods: {
        toggleSort() {
            this.sort_modifier = this.sort_modifier * -1;
        },
        getConcerts() {
            fetch('https://gist.githubusercontent.com/nchudleigh/92637a91938b16e105105de3ee91a569/raw/bbb5b1d549847e74afca77c2cfa3b514585678ad/events.json')
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    console.table(r);
                    this.concerts = r;
                })
        }
    }
})
