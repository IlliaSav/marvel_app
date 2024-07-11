

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=bef7e7189c9364cb60378baf085f4e57'

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.result.map(this._transforCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transforCharacter(res.data.results[0]);
    }

    _transforCharacter = (char) => {

        let desc = ""
        if (char.description.length === 0) {
            desc += "This character has no info..."
        } if (char.description.length >= 225) {
            console.log(char.description.length)
            desc += char.description.slice(0, 225) + "..."
        } else desc += char.description

        return {
            name: char.name,
            description: desc,
            // description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;