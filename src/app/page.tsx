
"use client"
import Image from "next/image";
import DarkAndLightBtn from './components/DarkAndLightBtn'
import SearchAndBtn from "./components/SearchAndBtn";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import dateFormat from  "dateformat"
import { useState } from "react";


type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: null | string;
  created_at: string;
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string;
  updated_at: string;
  url: string;
  documentation_url:string;
  message:"Not Found";
};


export default function Home() {

  const [userName, setUserName] = useState("octocat")

  const { isPending, error, data, refetch} = useQuery<GitHubUser>({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json(),
      ),
  })
  console.log('data',data);
  

  if (isPending) return(
     <div className="flex h-screen w-full items-center justify-center">
      <p className="animate-bounce">Loading...</p>
     </div>
  ) 

   const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
          e.preventDefault();
          refetch();
   }


  return (
       <div className="flex min-h-screen w-full p-1.5 sm:p-4 pt-10 sm:pt-12 transition-all dark:bg-slate-900">
        {/* container */}
        <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2 ">
            {/* 1st section */}
            <section className="flex justify-between gap-3">
              <p className="text-xl font-semibold">gfinder</p>
              <DarkAndLightBtn/>
            </section>
            {/* search and details section */}
            <section className="flex flex-col gap-6">
               {/* search and btn */}
               <SearchAndBtn onChange={(e)=>setUserName(e.target.value)} onSubmit={handleSubmit} value={userName}/> 

                {data?.message ? 
                <div className="flex w-full text-red-400 items-center flex-col gap-5 rounded-lg bg-stone-100 px-4 py-8  dark:bg-slate-800 ">
                   User Not Found
                </div>
                :
              <main className="flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]">
                
                  <section className="flex gap-4">
                     {/* image */}
                     <Image
                      className="w-20 h-20 rounded-full"
                       src={data?.avatar_url ?? ""}
                       width={200} height={200} 
                       alt="user-img"/>
                    <section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                      <div>
                        {/* name */}
                        <h1>{data?.name}</h1>
                        {/* userid */}
                        <Link target="_blank" className="text-blue-500 hover:underline text-sm transition-all" href={`https://github.com/${data?.login}`}>@{data?.login}</Link>
                      </div>
                      <div>
                        {/* joined date */}
                        <p className="">
                          <span>Joined </span>
                          <span>{dateFormat(data?.created_at,'dd mmm yyyy')}</span>
                        </p>
                      </div>
                    </section>
                  </section>

                  {/* section-2 */}

                  <section className="flex flex-col gap-4">
                    <p>{data?.bio ?? (
                      <span className="opacity-60">This profile has no bio.</span>
                    )}</p>
                    {/* follower section */}
                    <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px] ">
                       <div className="flex flex-col items-center gap-2">
                        <p className="text-xs opacity-60">Repository</p>
                        <p className="text-sm font-bold sm:text-base">{data?.public_repos}</p>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                        <p className="text-xs opacity-60">Followers</p>
                        <p className="text-sm font-bold sm:text-base">{data?.followers}</p>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                        <p className="text-xs opacity-60">Following</p>
                        <p className="text-sm font-bold sm:text-base">{data?.following}</p>
                       </div>
                    </div>
                       {/* social and address */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                        <div className="flex gap-2 items-center">
                        
                          <IoLocationOutline className="text-xl" />
                            <p>{data?.location ??
                             (
                              <span className="opacity-60">Not Available</span>
                             )
                            }{" "}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                      
                          <IoIosLink className="text-xl" />
                            {data?.blog ? (<Link 
                            target="_blank" title={data?.blog} 
                            className=" hover:text-blue-500 hover:underline opacity-60 max-w-[200px] overflow-hidden text-ellipsis"
                             href={data?.blog ?? "#"}>{data?.blog}
                             </Link>):<span className="opacity-60">Not Available</span>}{" "}
                            
                           
                        </div>
                        <div className="flex gap-2 items-center">
                          
                          <FaTwitter className="text-xl" />

                          {data?.twitter_username ? (
                                <Link className="hover:underline  hover:opacity-60 hover:text-blue-500" target="_blank" href={`https://twitter.com/${data.twitter_username}`}>
                                  {data.twitter_username}
                                </Link>
                              ) : (
                                <span className="opacity-60">Not Available</span>
                              )}

                          {/* <p>{data?.twitter_username ?? 
                             (
                              <span className="opacity-60">Not Available</span>
                             )
                            }
                            </p> */}
                        </div>
                        <div className="flex gap-2 items-center">
                   
                        <BsFillBuildingsFill  className="text-xl" />
                        <p>{data?.company ??
                             (
                              <span className="opacity-60">Not Available</span>
                             )
                            }
                            </p>
                        </div>
                    </div>
                  </section>
               
              </main>
                  }
            </section>

        </div>
       </div>
  );
}

//46.53



