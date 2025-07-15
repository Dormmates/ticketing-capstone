import { useParams } from "react-router-dom";
import { useGetShow } from "../../../_lib/@react-client-query/show";
import { ContentWrapper } from "../../../components/layout/Wrapper";
import BreadCrumb from "../../../components/ui/BreadCrumb";
import { useGetShowSchedules } from "../../../_lib/@react-client-query/schedule";

const ViewShow = () => {
  const { id } = useParams();
  const { data: show, isLoading: isShowLoading, isError: isShowError, error: showError } = useGetShow(id as string);
  const { data: showSchedules, isLoading: isSchedulesLoading, isError: isSchedulesError, error: schedulesError } = useGetShowSchedules(id as string);

  if (isShowLoading || isSchedulesLoading) {
    return <div>Loading...</div>;
  }

  if (isShowError || isSchedulesError) {
    return (
      <div className="text-red-500">
        {isShowError && <p>Failed to load show: {showError?.message}</p>}
        {isSchedulesError && <p>Failed to load schedules: {schedulesError?.message}</p>}
      </div>
    );
  }

  return (
    <ContentWrapper className="lg:!p-20 flex flex-col">
      <BreadCrumb
        backLink="/shows"
        items={[
          { name: "Shows", path: "/shows" },
          { name: show?.title + "", path: "" },
        ]}
      />

      <div>
        <div className="border border-lightGrey p-10 flex gap-5 mt-10 rounded-md shadow-sm w-fit">
          <img className="w-[200px] h-[220px] object-contain bg-gray" src={show?.showCover} alt="show image" />

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl uppercase">{show?.title}</h1>
            <p className="text-left break-words whitespace-pre-wrap  line-clamp-4 text-zinc-800 max-w-[500px]">{show?.description}</p>
            <div className="flex flex-col gap-2">
              <p>Genres: </p>
              <div className="flex gap-5">
                {show?.genreNames.map((name, index) => (
                  <div key={index} className="bg-gray border-2 border-lightGrey px-5 rounded-full">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-semibold text-2xl ">Show Schedule</h1>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ViewShow;
