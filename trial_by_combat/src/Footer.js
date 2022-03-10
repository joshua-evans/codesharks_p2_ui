import React from "react";
import './footer.css';
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {question: "", punchline: ""};
        this.fetchJoke = this.fetchJoke.bind(this);
        this.fetchJoke();
    }

    fetchJoke = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            
            const fetchResponse = await fetch("https://backend-omega-seven.vercel.app/api/getjoke", settings);
            const data = await fetchResponse.json();
            let i = 0;
                     
            console.log(data[0].question);
            console.log(data[0].punchline);
            this.setState({question:data[0].question});
            this.setState({punchline:data[0].punchline});
              
        } catch (e) {
            console.log(e);
        }       
      }



    render() {
     
        return (
            <footer id="custom_footer" class="p-3 bg-dark text-white">
                <div class="inline-flex">
                    <span>{this.state.question}&nbsp;&nbsp;&nbsp;</span>
                    <span>{this.state.punchline}</span>
                </div>
            </footer>
        ); 
    }
}

export default Footer;
