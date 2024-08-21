import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }
    
    // Default way

    // const onCharListLoaded = async (newCharList) => {
    //     let ended = false;
    //     if (newCharList.length < 9) {
    //         ended = true;
    //     }
    //     setCharList([...charList, ...newCharList]);
    //     setNewItemLoading(false);
    //     setOffset(offset + 9);
    //     setCharEnded(ended)
    // }

    // Recursion way

    // const onCharListLoaded = (newCharList) => {
    //     let ended = false;
    //     if (newCharList.length < 9) {
    //         ended = true;
    //     }
 
    //     const addChar = (index) => {
    //         if (index < newCharList.length) {
    //             setCharList(charList => [...charList, newCharList[index]]);
    //             setTimeout(() => addChar(index + 1), 1000);
    //         } else {
    //             setNewItemLoading(false);
    //             setOffset(offset => offset + newCharList.length);
    //             setCharEnded(ended);
    //         }
    //     };
    
    //     addChar(0);
    // }

    // Delay way

    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
 
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
 
        for (let char of newCharList) {
            await delay(500);
            setCharList(charList => [...charList, char]);
        }
 
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail.includes('image_not_available')) { imgStyle = {'objectFit' : 'unset'}}

            return (
                <CSSTransition in={true} key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(item.id);
                                focusOnItem(i)
                            }
                        }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });


        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
            // <TransitionGroup component={'ul'}  className="char__grid">
            //     {items}
            // </TransitionGroup>
        )
    }



    const items = renderItems(charList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;