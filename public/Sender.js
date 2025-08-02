const Sender = class{
    constructor(){
        this._url = "/sesion";
        this._method = 'post';
        this._headers = {'Content-type':'application/json'};
        this._callback = ()=> {};
        this.r = null;
    }
    send(j){
        fetch(this._url,{
                method: this._method,
                body: JSON.stringify(j),
                headers:this._headers,
                mode:"cors",
                cache:'default'
            })
            .then(response =>{return response.json()})
            .then(r => {this.r = r; this._callback(this.r)})
    }

    get url(){return this._url}
    set url(val){this._url = val}
    get method(){return this._method}
    set method(val){this._method = val}
    get headers(){return this._headers}
    set headers(val){this._headers = val;}
    get callback(){return this._callback}
    set callback(val){this._callback = val}
}

window.sender = new Sender();