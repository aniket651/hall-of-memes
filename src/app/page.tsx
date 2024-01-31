'use client'
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState, useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';



import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

const memeReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_MEMES':
      return { ...state, memes: [...state.memes, ...action.payload] };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'CHANGE_AFTER':
      return { ...state, after: action.payload };
    default:
      return state;
  }
};



export default function Home() {
  const [state, dispatch] = useReducer(memeReducer, {
    memes: [],
    hasMore: true,
    after: "",
  });

  const fetchMemes = async () => {
    try {
      const jsondata = await axios.get(`https://www.reddit.com/r/memes.json?after=${state.after}`);
      const newMemes = jsondata.data.data.children;
      console.log(jsondata.data.data.dist);
      if (jsondata.data.data.dist === 0) {
        dispatch({ type: 'SET_HAS_MORE', payload: false });
        return;
      }
      dispatch({ type: 'ADD_MEMES', payload: newMemes });
      dispatch({ type: 'CHANGE_AFTER', payload: jsondata.data.data.after });
      console.log("hello");
    } catch (error) {
      console.error(`error in fetching memes: ${error}`);
    }
  }

  useEffect(() => {
    fetchMemes();
  }, []); // Initial fetch

  return (
    <main className={styles.main}>

      <Gallery>
        <InfiniteScroll
          dataLength={state.memes.length}
          next={fetchMemes}
          hasMore={state.hasMore}
          loader={<h4>Loading...</h4>}
        >
          {state.memes.map((e: any) => {
            const isValidUrl = /^https?:\/\//.test(e.data.url);

            return isValidUrl ? (
              <Item
                original={e.data.url}
                thumbnail={e.data.url}
                width="1024"
                height="768"
                key={e.data.name}
              >
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={e.data.url}
                    alt={e.data.title}
                    width={400}
                    height={300}
                  />
                )}
              </Item>
            ) : (
              <div key={e.data.id}>Invalid Thumbnail</div>
            );
          })}
        </InfiniteScroll>
      </Gallery>

    </main>
  );
}
