/**
 * This Class is responsible for handling
 * the POST requests
 */
class Post{
    async connect(url,data){
        await fetch(url,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                temperature: data.teperature,
                content: data.content,
                location: data.location
            })
        })
    }
    async getData(){
        let r = await fetch('/all')
        return await r.json()
    }
}