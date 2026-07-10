type Props = {
  params: Promise<{ jobId: string }>;
};

type Job = {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
  active: boolean;
};


async function getJob(jobId: string): Promise<Job> {

  const response = await fetch(
    `http://localhost:8081/api/jobs/${jobId}`,
    {
      cache: "no-store",
    }
  );


  if (!response.ok) {
    throw new Error("Job not found");
  }


  const result = await response.json();

  return result.data ?? result;
}



export default async function JobDetailPage({ params }: Props) {


  const { jobId } = await params;


  const job = await getJob(jobId);



  return (

    <main className="min-h-screen bg-slate-950 px-6 py-10">

      <div className="mx-auto max-w-6xl">


        {/* Header */}

        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
          Role details
        </p>


        <h1 className="mt-3 text-4xl font-bold text-white">
          {job.title}
        </h1>


        <p className="mt-3 max-w-3xl text-slate-400">
          {job.description}
        </p>



        <a
          href="/jobs"
          className="
          mt-6 inline-flex rounded-xl 
          bg-slate-800 px-5 py-3 
          text-white transition 
          hover:bg-slate-700
          "
        >
          ← Back to roles
        </a>





        <div className="mt-8 grid gap-5 xl:grid-cols-3">



          {/* Company Card */}

          <section
            className="
            rounded-[28px]
            border border-white/10
            bg-slate-900
            p-6
            "
          >

            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Company
            </p>


            <h2 className="mt-3 text-2xl font-semibold text-white">
              {job.company}
            </h2>



            <div className="mt-6 flex flex-wrap gap-2">


              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {job.location}
              </span>


              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {job.jobType}
              </span>


              {job.active && (

                <span
                  className="
                  rounded-full 
                  bg-green-500/10 
                  px-3 py-1 
                  text-xs 
                  text-green-300
                  "
                >
                  Active
                </span>

              )}


            </div>


          </section>





          {/* Summary */}

          <section
            className="
            xl:col-span-2
            rounded-[28px]
            border border-white/10
            bg-slate-900
            p-6
            "
          >


            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Role Summary
            </p>


            <h2 className="mt-3 text-2xl font-semibold text-white">
              {job.title}
            </h2>



            <p className="mt-5 leading-7 text-slate-400">
              {job.description}
            </p>





            <div
              className="
              mt-6
              rounded-3xl
              bg-slate-800
              p-5
              "
            >

              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Why this role fits
              </p>


              <p className="mt-3 text-slate-200">
                This role matches your career goals based on
                skills, experience and AI career recommendations.
              </p>


            </div>


          </section>


        </div>





        {/* Responsibilities */}


        <section
          className="
          mt-8
          rounded-[28px]
          border border-white/10
          bg-slate-900
          p-6
          "
        >


          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
            Key Responsibilities
          </p>



          <ul
            className="
            mt-5
            space-y-3
            text-sm
            text-slate-400
            "
          >

            <li>
              • Build scalable solutions for business requirements.
            </li>


            <li>
              • Collaborate with engineering and product teams.
            </li>


            <li>
              • Improve user experience using data-driven decisions.
            </li>


          </ul>





          <div
            className="
            mt-6
            rounded-3xl
            bg-slate-800
            p-5
            "
          >


            <p className="font-semibold text-white">
              Location
            </p>


            <p className="mt-2 text-slate-300">
              {job.location}
            </p>



            <p className="mt-4 font-semibold text-white">
              Job Type
            </p>


            <p className="mt-2 text-slate-300">
              {job.jobType}
            </p>


          </div>



        </section>



      </div>


    </main>

  );
}