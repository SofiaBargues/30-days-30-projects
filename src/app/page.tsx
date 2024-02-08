import Image from "next/image";

const DAYS = [
  "1",
  "2, 3 and 4",
  "5, 6 and 7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";
const PLAYLIST_ID = "PLrVXEY3WfL-2AZjD_X_03OqpzGLrySOsv";
export default async function Home() {
  //llamada a la api
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=30&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed lg:text-2xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          30 Days 30 Projects
        </p>
        <div className="fixed lg:text-xl bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          Project based learning challenge
        </div>
      </div>

      <div
        className="relative flex place-items-center before:absolute before:h-[300px] 
      before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
       before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 
       after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-rose-00
        after:via-rose-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent
         before:dark:to-pink-300 before:dark:opacity-10 after:dark:from-purple-400 after:dark:via-[#40036b] after:dark:opacity-40 
         before:lg:h-[360px] z-[-1]"
      ></div>

      <ul className="m-10 gap-6 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {data.items.map((item: any, index: number) => {
          const { id, snippet = {} } = item;
          const { title, thumbnails = {}, resourceId } = snippet;
          const { medium = {} } = thumbnails;
          return (
            <li
              key={id}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <a
                className="flex flex-col items-center gap-4"
                href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
              >
                <h2 className={` text-2xl font-semibold`}>Day {DAYS[index]}</h2>
                <Image
                  className="rounded-lg"
                  width={medium.width}
                  height={medium.height}
                  src={medium.url}
                  alt={title}
                ></Image>
                <p
                  className={`w-full text-center text-sm opacity-50 text-balance`}
                >
                  {title}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
