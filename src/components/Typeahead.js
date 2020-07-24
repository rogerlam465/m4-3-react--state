import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    flex-direction: column;
`

const Input = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
`
const InputField = styled.input`
    margin: 10px;
    height: 40px;
    width: 300px;
`

const InputButton = styled.button`
    background: #2102ad;
    color: white;
    border: 0;
    border-radius: 3px;
    height: 40px;
    padding: 0 10px 0 10px;
    font-size: 20px;
`
const BookList = styled.ul`
    width: 400px;
    padding: 10px;
    box-shadow: 0px 4px 10px 2px rgba(0,0,0,0.1);
`

const Suggestions = styled.li`
    margin-bottom: 10px;
    padding: 10px;

    &:hover {
        background: lightyellow;
    }

    &:last-child {
        margin-bottom: 0;
    }
`

let Prediction = styled.span`
    font-weight: bold;
`

let BookSpan = styled.span`
    color: purple;
    font-style: italic;
`

// ok. I think we clearly want Array.includes(), since that'll return a true/false
// based on the contents of the string.

// We also have the books array, in the form of the suggestions variable, but we
// want to search through only the list of book titles.

function FindBook({ value, bookTitles, handleSelect, categories, bookData }) {
    let bookTitleArr = bookTitles.filter(title => title.toLowerCase().includes(value.toLowerCase()));

    // I want bookArr to actually contain an array of books and types
    // something like. ["Book Title", "Genre"]

    let bookArr = [];

    bookTitleArr.forEach(title => {
        let bookIdx = bookData.find(book => book.title === title);
        bookArr.push([title, categories[bookIdx.categoryId]["name"]]);
    })

    if (value.length > 2) {
        return (
            bookArr.map(book => {
                console.log(value);
                // bolding logic goes here, I guess

                // ok. let's think this through calmly and rationally. everything's fine.
                // we need to get the full title, which we have, but find the index
                // of the value in there. everything else needs to be bolded.
                // I said everything's fine! will you calm down!

                let textEndingIdx = book[0].toLowerCase().indexOf(value);
                let textEndingStr = book[0].slice(textEndingIdx);
                let textStartStr;

                if (book[0].slice(0, textEndingIdx - 1) === "") {
                    textStartStr = "";
                } else {
                    textStartStr = " " + book[0].slice(0, textEndingIdx);
                }

                console.log(textEndingStr);

                return <Suggestions onClick={(ev) => { handleSelect(ev.target.innerText) }}>{textStartStr}<Prediction>{textEndingStr}</Prediction> in <BookSpan>{book[1]}</BookSpan></Suggestions>
            })
        )
    } else {
        return null;
    }
}


function Typeahead({ suggestions, handleSelect, categories }) {

    // Pretty sure that setValue is just an arbitrary name set by convention
    // to match with the first one

    const [value, setValue] = React.useState('');

    let bookTitles = [];

    suggestions.forEach(book => {
        bookTitles.push(book.title)
    });

    // value specifies the initial value in the input field, which is blank.
    // but I don't know why we'd go to the trouble of doing that right now.

    // onChange should set the value in state. I think this is so that it can store
    // new values as the user types it. Actually, it grabs the state *before*
    // the onChange is processed, which is weird.

    // I've actually changed this for onKeyDown and set value, but this isn't ideal
    // because of non-visible non-relevant characters (ctrl, alt, etc.) Whatever,
    // it's fine for the purposes of this exercise.

    // onKeyDown should trigger an alert with the title of the book. Ok.

    // ex. 3 thoughts

    // If I read the hints, it seems like I should re-implement the suggestions
    // logic. I really don't like that, but fine. whatever.


    let bookArr = bookTitles.filter(title => title.toLowerCase().includes(value.toLowerCase()));

    let suggestionExist;

    if (bookArr.length === 27 || bookArr.length === 0) {
        suggestionExist = false;
    } else {
        suggestionExist = true;
    }

    return (
        <Wrapper>
            <Input>

                <InputField
                    type="text"
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            handleSelect(ev.target.value)
                        } else {
                            let stringHolder = ev.target.value + ev.key;
                            if (stringHolder.length > 2) {
                                setValue(stringHolder);
                            }
                        }
                    }} />
                <InputButton onClick={() => setValue('')}>Clear</InputButton>

            </Input>

            {suggestionExist &&
                <BookList>
                    <FindBook value={value} bookTitles={bookTitles} handleSelect={handleSelect} categories={categories} bookData={suggestions} />
                </BookList>
            }
        </Wrapper>
    )
};

export default Typeahead;