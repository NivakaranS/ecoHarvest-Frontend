



import React, {useEffect, useState} from "react"

import axios from "axios"

const Guests = () => {
    const [newsTitle, setNewsTitle] = useState("")
    const [newsSubtitle, setNewsSubtitle] = useState("")
    const [newsContent, setNewsContent] = useState("")
    const [newsCategory, setNewsCategory] = useState("")
    const [description, setDescription] = useState("")
    const [newsSuccess, setNewsSuccess] = useState(false)
    const [newsCategories, setNewsCategories] = useState([])
    const [newsCategoryTitle, setNewsCategoryTitle] = useState("")
    const [newsCategoryImageUrl, setNewsCategoryImageUrl] = useState("")

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            console.log(preview)
        }
    }

    // const handleUpload = async () => {
    //     if(!file) {
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("title", newsCategoryTitle);


    //     try {
    //         const response = await axios.post("http://localhost:5000/newsCategory/create", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });
    //         console.log(response)

    //         setFile(null);
    //         setPreview(null);
    //     } catch(error) {
    //         console.error("Error in uploading file: ", error);
    //     } 
    // }

    // const fetchNewsCategory = async () => {
    //     try {
    //         const data = await getAllNewsCategory();
    //         setNewsCategories(data);
    //         console.log("News Category: ", data);
    //     } catch (err) {
    //         console.error("Error in fetching news category: ", err);
    //     }
    // }

    // useEffect(() => {
        
    //     fetchNewsCategory()
    //     }, [newsCategoryTitle, newsCategoryImageUrl]);

    
    // const addNewsCategory = async () => {
    //     try {
    //         const data = await createNewsCategory({
    //             title: newsCategoryTitle, 
    //             imageUrl: newsCategoryImageUrl
    //         });
            
    //         console.log("News Category added successfully:", data);
    
            
    //         setNewsCategoryTitle("");
    //         setNewsCategoryImageUrl("");

    //         fetchNewsCategory();
    //     } catch (err) {
    //         console.error("Error in adding news category: ", err);
    //     }
    // }

    // const addNews = async () => {
    //     try {
    //         const data = await createNews({
    //             title: newsTitle, 
    //             subTitle: newsSubtitle, 
    //             content: newsContent, 
    //             category: newsCategory, 
    //             description: description,
    //             imageUrl: "https://www.google.com" 
    //         });
            
    //         console.log("News added successfully:", data);
    
            
    //         setNewsTitle("");
    //         setNewsSubtitle("");
    //         setDescription("");
    //         setNewsContent("");
    //         setNewsCategory("");
    //         setNewsSuccess(true);
    //         setTimeout(() => {
    //             setNewsSuccess(false)
    //         }, 1000);
    //     } catch (err) {
    //         console.error("Error in adding news: ", err);
    //     }
    // };
    

    const handleNewsCategoryTitleChange = (e) => {
        setNewsCategoryTitle(e.currentTarget.value)
    }

    const handleNewsCategoryImageUrlChange = (e) => {
        setNewsCategoryImageUrl(e.currentTarget.value)
    }



    const handleTitleChange = (e) => {
        setNewsTitle(e.currentTarget.value)
        
    }

    const handleSubtitleChange = (e) => {
        setNewsSubtitle(e.currentTarget.value)
        
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
        
    }

    const handleContentChange = (e) => {
        setNewsContent(e.currentTarget.value)
        
    }

    const handleNewsCategoryClick = (e) => {
        console.log(e.currentTarget.innerText)
        setNewsCategory(e.currentTarget.innerText)
        console.log("News Category Clicked")
    }

    return(
        <div>
            <div className="bg-gray-100 flex space-x-2 flex-row h-[90vh] px-[15px] py-[8px] text-black  w-full">
                <div className="bg-gray-200 rounded-[10px] py-[10px] px-[15px] w-[75%]">
                    
                    <div className="mt-[10px] flex flex-col px-[10px]">
                        <p className="text-[25px]">Create News</p>
                        <div className="overflow-y-scroll overflow-x-hidden flex flex-col space-y-[8px] h-[480px]">
                            <div className="flex flex-col  space-y-[2px] ">
                                <p className="text-[16px]">Title</p>
                                <input placeholder="" value={newsTitle} onChange={handleTitleChange} className="focus:outline-none border bg-white rounded-[5px] px-[10px] py-[5px] w-[98%]"/>
                            </div>
                            <div className="flex flex-col  space-y-[2px]">
                                <p className="text-[16px]">Subtitle</p>
                                <input placeholder="" value={newsSubtitle} onChange={handleSubtitleChange} className="focus:outline-none border bg-white rounded-[5px] px-[10px] py-[5px] w-[98%]"/>
                            </div>
                            <div className="flex flex-col mb-[15px] space-y-[5px]">
                                <p className="text-[16px]">News category<span className="text-[10px] ml-[2px]">(Select one)</span></p>
                                <div className="w-[98%] overflow-x-scroll  overflow-y-hidden no-scrollbar h-[8vh] py-[5px] px-[10px]  flex flex-row space-x-[10px] ">
                                    
                                    {newsCategories.map((category, index) => (
                                        <div key={index} onClick={handleNewsCategoryClick} className={`${newsCategory== category.title ? ' ring-[3px] ring-blue-500' : ''} text-[14px] cursor-pointer rounded border-[0.5px] bg-white flex items-center justify-center w-fit px-[10px] py-[5px]`}>
                                            <p>{category.title}</p>
                                        </div>
                                    ))
                                        }

                                    
                                </div>
                            </div>
                            <div className="flex flex-col  space-y-[2px]">
                                <p className="text-[16px]">Description<span className="text-[11px] ml-[3px]">(Max characters: 100)</span></p>
                                <textarea placeholder="" value={description} onChange={handleDescriptionChange} className="border focus:outline-none bg-white h-[100px] rounded-[5px] px-[10px] py-[5px] w-[98%]"/>
                            </div>
                            <div className="flex flex-col  space-y-[2px]">
                                <p className="text-[16px]">Content</p>
                                <textarea placeholder="" value={newsContent} onChange={handleContentChange} className="border focus:outline-none bg-white h-[300px] rounded-[5px] px-[10px] py-[5px] w-[98%]"/>
                            </div>
                            <div className="flex flex-row ml-[10px] space-x-[5px]">
                                <input type="checkbox" className="bg-white"/>
                                <p className="text-[13px]">I confirm that information provided is correct</p>
                            </div>
                            <div className="flex  px-[20px] pb-[10px]">
                                <div  className="bg-blue-500 cursor-pointer w-fit px-[15px] py-[5px] rounded">
                                    <p>Submit</p>
                                </div>
                            </div>
                            <div className={`${newsSuccess ? ' scale-100' : 'scale-0'} absolute top-[45px] left-[40%] right-[40%] bg-green-500 ring-[1px] ring-green-900 opacity-70  flex items-center justify-center px-[10px] h-[60px] w-[210px]  rounded-[10px]`}>
                                <p className="leading-[20px]">News successfully Created</p>
                            </div>
                        </div>
                    </div>
                        
                    
                    

                </div>
                <div className=" py-[10px] px-[10px] bg-gray-200 rounded-[10px] h-[85%] w-[30%]">
                    <p>Add News Category</p>
                    
                    <div className="my-[5px]">
                        <div className="text-[13px] w-[50%] flex flex-col space-y-[2px]">
                            <p>Category Name</p>
                            <div className="ml-[3px] ">
                                <input onChange={handleNewsCategoryTitleChange} value={newsCategoryTitle} className="px-[5px] focus:outline-none py-[4px] w-[212px] border-gray-400 rounded border-[1px]"/>
                            </div>
                        </div>
                    </div>
                  
                    <div className="text-[13px] bg-white mb-[8px] py-[7px] rounded-[8px] border-gray-400 border-[1px] ">
                        <p className="px-[10px] mb-[5px]">Upload</p>
                        <div className="text-center h-[100px] flex flex-col border-gray-400 items-center justify-center border-y-[1px]">
                            <p><span className="text-blue-700 cursor-pointer">Click to upload</span> or drag and drop</p>
                            <p className="text-[11px]">[Max File size: 25 MB]</p>
                            <input type="file" onChange={handleFileChange} className="bg-gray-500"  />
                        </div>
                        <div>
                            <div className="leading-[14px] pt-[8px] px-[10px]">
                                <p>Room image 1.jpge</p>
                                <p className="text-[10px]  text-gray-500">200 KB</p>
                            </div>
                            <div className="flex flex-row items-center  justify-center space-x-[5px]">
                                <div className="w-[79%] h-[3px] bg-black rounded-[10px]"></div>
                                <p className="text-[10px] text-gray-700 ">40%</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row justify-end  space-x-[5px] text-[13px] ">
                       
                        <div  className="bg-blue-600 text-white flex items-center justify-center px-[15px] py-[5px] cursor-pointer rounded border-[1px] border-gray-500">
                            <p>Add Category</p>
                        </div>
                    </div>
                    <div>
                        <p>Delete Category</p>
                    </div>
                    <div className="grid grid-cols-3 gap-[5px]">
                    {newsCategories.map((category, index) => (
                                        <div key={index} onClick={handleNewsCategoryClick} className={`${newsCategory== category.title ? 'ring-[3px] ring-blue-500' : ''} text-[14px] cursor-pointer rounded border-[0.5px] bg-white w-[100%] flex items-center justify-center`}>
                                            <p>{category.title}</p>
                                        </div>
                                    ))
                                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guests