import React, { useCallback, useEffect, useState} from "react";
import { useRef } from "react";
const QuoteBox = () => {
    // dom element refs declaration
    const text = useRef(null)
    const author = useRef(null)
    const changeQuoteBtn = useRef(null)
    const tumblr = useRef(null)
    const twitter = useRef(null)
    // change quote button function
    const changeQuote = useCallback(()=>{
        let newQuote = ""
        // fetch api for random quote
        fetch('https://api.quotable.io/random').then(response=>{
            return response.json()
        }).then(json => {
            // quotable api github page : https://github.com/lukePeavey/quotable
            // transition to the new quote (style + data)
            newQuote = {quote: json.content, author: json.author}
            text.current.style.opacity = 0
            author.current.style.opacity = 0
            setTimeout(()=>{
                text.current.innerText = newQuote.quote
                author.current.innerText = "-"+newQuote.author
                text.current.style.opacity = 1
                author.current.style.opacity = 1
            }, 500)
            const randomColor = `rgb(${Math.floor(Math.random()*(255))},${Math.floor(Math.random()*(255))},${Math.floor(Math.random()*(255))})`
            changeQuoteBtn.current.style.backgroundColor = randomColor
            twitter.current.style.backgroundColor = randomColor
            tumblr.current.style.backgroundColor = randomColor
            document.body.style.backgroundColor = randomColor
            document.body.style.color = randomColor
            // href change for sharing the quote to twitter or tumblr
            twitter.current.href = `https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${encodeURIComponent(newQuote.quote)}"${encodeURIComponent(" " + newQuote.author)}`
            tumblr.current.href= `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(newQuote.author)}&content=${encodeURIComponent(newQuote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
        })

    },[])
    // execute change quote function on load
    useEffect(()=>{
        changeQuote()
    },[])

    return (
        <div id="wrapper">
            <div id="quote-box">
                <i className="fa fa-quote-left"></i><span id="text" ref={text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias dolore corporis, provident ipsam necessitatibus quisquam porro qui odio eligendi dolor molestiae nihil magni, earum eaque, cum consequatur. Voluptatem, earum odit?</span>
                <p id="author" ref={author}>-Jack Bones</p>
                <div className="flex-r flex-sb container">
                    <div className="flex-r">
                        <a ref={twitter} target="_blank" id="tweet-quote" className="link-btn" href=""><i className="fa fa-twitter"></i></a>
                        <a ref={tumblr} target="_blank" id="tumblr-quote" className="link-btn" href="https://www.tutorialspoint.com/What-e-preventDefault-method-really-does-in-jQuery#:~:text=The%20preventDefault()%20method%20stops,button%20from%20submitting%20a%20form."><i className="fa fa-tumblr"></i></a>
                    </div>
                    <button onClick={()=>changeQuote()} ref={changeQuoteBtn} id="new-quote">New quote</button>
                </div>
            </div>
            <footer><p>By Mohamed Aziz Jedidi</p></footer>
        </div>
    )   
}

export default QuoteBox