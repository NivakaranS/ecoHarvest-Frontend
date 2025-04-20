

import Image from "next/image"
import Bed from '../images/aii.jpg'
import React, {useEffect, useState} from "react"

import {ReactSortable} from 'react-sortablejs';


const Rooms = () => {

    const [news, setNews] = useState([]);
    const [isChanged, setIsChanged] = useState(false)

    // useEffect(() => {
    //     const fetchNews = async () => {
    //         try {
    //             const data = await getNews();
    //             const sortedNews = data.map((item, index) => ({
    //                 ...item,
    //                 id: item._id || index.toString()
    //             })).sort((a, b) => a.priority - b.priority);
    //             setNews(sortedNews)
    //         } catch(err) {
    //             console.error("Error in fetching news: ", err)
    //         }
    //     }
    //     fetchNews()
    // }, [])

    const handleSort = (newOrder) => {
        const reorderedNews = newOrder.map((item, index) => ({
            ...item, // Directly use item from newOrder
            priority: index + 1 // Update priority based on new order
        }));
        
        setNews(reorderedNews);
        setIsChanged(true);
    };
    
    // const handleConfirm = async () => {
    //     try {
    //         await updateManyNews(news);
    //         setIsChanged(false)
    //         console.log("News priority updated successfully")
    //     } catch(err) {
    //         console.error("Error in updating news priority: ", err)
    //     }
    // }


    return(
        <div>
            <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
                <div className="bg-gray-200 rounded-[10px] py-[10px] px-[15px] w-[100%]">
                    <p className="text-[18px]">All News</p>
                    <div className="flex flex-col space-y-[235px] justify-between">
                        <div className="flex flex-col space-y-[5px] w-[100%] ">
                            <div className="flex flex-row text-[13px] ">
                                <div className=" pl-[8px] w-[165px]">
                                    <p>Image</p>
                                </div>
                                <div className="w-[120px]">
                                    <p>Category</p>
                                </div>
                                <div className="w-[180px]">
                                    <p>Title</p>
                                </div>
                                <div className="w-[122px]">
                                    <p>Subtitle</p>
                                </div>
                                <div className="w-[170px] ">
                                    <p>Description</p>
                                </div>
                                <div className="w-[80px]">
                                    <p>Priority</p>
                                </div>
                                <div className="w-[100px]">
                                    <p>Actions</p>
                                </div>
                                
                            </div>
                          <ReactSortable list={news} setList={handleSort} animation={200} className="h-[450px] overflow-y-scroll flex pb-[10px] flex-col space-y-[5px] ">
                            { news.map((news) => (
                                <div key={news.id}   className="flex cursor-pointer flex-row border border-gray-500 bg-gray-100 rounded-[10px]  text-[13px]">
                                <div className="flex flex-row w-[150px] pl-[10px] py-[10px]  justify-center">
                                    <div className=" overflow-hidden rounded-[10px] w-[100%]">
                                        <Image src={Bed} alt="bed" className="h-[80px] w-[auto]" />
                                    </div>
                                    
                                </div>
                                <div className="flex items-center w-[135px] pl-[20px]">
                                    <div className="bg-yellow-200 px-[10px] py-[2px] rounded text-yellow-600">
                                        <p>{news.category}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[180px] justify-center">
                                    <p>{news.title}</p>
                                    
                                </div>
                                <div className="flex w-[122px] flex-col  justify-center">
                                    <p>{news.subTitle}</p>
                                </div>
                                <div className="flex w-[175px] flex-col  justify-center">
                                    <p>{news.description}</p>
                                </div>
                                <div className="flex flex-col w-[80px] justify-center">
                                    <p>{news.priority}</p>
                                </div>
                                <div className="w-[100px] flex flex-row  space-x-[5px] justify-center items-center">
                                    <div className="bg-blue-500 px-[10px] cursor-pointer py-[5px] rounded text-white">
                                        <p>Edit</p>
                                    </div>
                                    <div className="bg-red-500 px-[10px] cursor=pointer py-[5px] rounded text-white ml-[5px]">
                                        <p>Delete</p>
                                    </div>
                                </div>
                                
                            </div>
                            ))}
                            </ReactSortable>
                            
                            
                        </div>
                        
                        
                            
                     
                    </div>
                        <div className="w-[100%] flex pt-[5px]">
                            <button
                                className={` px-3 py-1 rounded ${isChanged ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"}`}
                                disabled={!isChanged}
                                
                            >
                                <p>Confirm Order</p>
                            </button>
                        </div>
                    </div>
                    
                </div>
        </div>
    )
}

export default Rooms;