import React,{ useState } from 'react'


function App() {
  //first choose part
  const [choose, setChoose] = useState([
    {
    A: 'A1',
    B: 'B1'
    },
    {
      A: 'A2',
      B: 'B2'
      }
  ])
  const [newChooses, setNewChooses] = useState("")
  const [id, setId] = useState(3)

  const [cvId, setCvId] = useState(2) // this is the cv's id

  const addChoose = () => {
    const newChooses = [...choose]
    newChooses.push({
      A: 'A' + id,
      B: 'B' + id
    })
    setId(e => e + 1)
    setChoose(newChooses)
    setNewGroups("")
  }
  //second choose parts
  const [groups, setGroups] = useState([
    {
      name: "G1",
      captions: [{
        C: "C1",
        V: "V1"
      }]
    }
  ]);
  const [newGroup, setNewGroup] = useState("");
  const addGroup = () => {
    const newGroups = [...groups];
    newGroups.push({
      name: newGroup,
      captions: [],
    });
    setGroups(newGroups);
    setNewGroup("");
    setId(0)
    setCvId(1)
  };
  const addCaptions = (groupIndex, caption) => {
    const newGroups = [...groups]
    newGroups[groupIndex].captions.push({
      C: 'C' + cvId,
      V: 'V' + cvId
    }
    )
    setCvId( e => e + 1)
    setGroups(newGroups);
    setNewGroup("");
  };
  // displaying the forms
  const [title, setTitle] = useState("Title goes here...")
  const handleTitleChange = e => {
    setTitle(e.target.value === "" ? "Title goes here..." : e.target.value)
  }
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1'>
        <div> {/*container 1*/}
    {/* title */}
    <div className='bg-gray-200 mt-6 ml-6 '>
        <input
          className='m-6 bg-white px-4 py-2 w-[86%]'
          type="text"
          placeholder="Title"
          onChange={handleTitleChange}
        />
    </div>
    {/* the first part */}
    <div className='bg-gray-200 ml-6'>
        <div className='bg-white'>
            <h1 className='py-2 text-xl px-8 font-bold'>A & B</h1>
        </div>
      
      <div className='py-2 px-4 m-4 grid grid-rows-2'>
        {choose.map((e, i) => (
          <div className='flex gap-12 mb-4' key={i}>
            <input
              className='py-2 px-2'
              type="text"
              placeholder={e.A}
              value={e.A}
              name="A"
            />
            <input
              className='py-2 px-2'
              type="text"
              placeholder={e.B}
              value={e.B}
              name="B"
            />
          </div>
        ))}
        <div className='grid grid-cols-2 mb-2'>
          <div className=''></div>
          <div className='flex justify-end mr-12'>
            <button onClick={addChoose} className="bg-indigo-700 text-white px-4 py-2 ">Add A & B</button>
          </div>
          
        </div>
        
      </div>
    </div>
      
    {/* the second part */}
    <div className="bg-gray-200 ml-6">
        <div className='bg-white'>
            <h1 className=' text-xl py-2 px-8 font-bold'>Groups</h1>
        </div>
    <div className='py-2 px-4 m-4'>
      {groups.map((group, i) => (
        <div className='mb-4'>
          <div className='mb-4 '>
          <input
              className='py-2 px-2 w-[94%]'
              type="text"
              placeholder={"G - " + (i + 1)}
              name="groupNum"
              
            />
            {/* <p className='bg-white w-[42.5%] px-4 py-2 text-gray-400'>G - {i + 1}</p> */}
          </div>
          
          <Group
            group={group}
            addCaptions={(caption) => addCaptions(i, caption)}
          />
        </div>
        
      ))}
      </div>

      <form
        className='m-2'
        onSubmit={(e) => {
          e.preventDefault();
          addGroup();
        }}
      >
        <button type="submit" className="bg-indigo-700 text-white px-6 py-2 ml-6" onChange={(e) => setNewGroup(e.target.value)}>
                <h1 className='font-bold'>AddGroup</h1>
        </button>
      </form>
    </div>
    </div>
    {/* this is where the form will be displayed*/}
    <div className='flex flex-col w-full'>
        <h1 className='font-bold text-4xl mx-auto my-10'>{title}</h1>
        <h1 className='font-bold text-2xl ml-12 mb-5'>A & B</h1>
        <div className=''>
            {
                choose.map((e, i) => {
                    return(
                        <div key={i} className='flex gap-4 mb-2 ml-12 w-max'>
                                        <h1 className='bg-gray-200 px-4 py-2'>{e.A}</h1>
                                        <h1 className='bg-gray-200 px-4 py-2'>{e.B}</h1>
                                    </div>
                    )
                })
            }
        </div>
        <div className='grid grid-cols-3'>
            {groups.map((e, i) => {
                return(
                    <div key={i}>
                        <h1 className='font-bold text-2xl ml-12 my-5' >Groups - {(i+ 1)}</h1>
                        {
                            e.captions.map((gp, i) => {
                                return(
                                    <div key={i} className='flex gap-4 mb-2 ml-12 w-max'>
                                        <h1 className='bg-gray-200 px-4 py-2'>{gp.C}</h1>
                                        <h1 className='bg-gray-200 px-4 py-2'>{gp.V}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

            )}
        </div>


        
    </div>
    
    </div>

    

  )

}
//the group component
const Group = ({ group, addCaptions}) => {
  const [newCaption, setNewCaption] = useState("");
  
  const onAddCaption = () => {
    addCaptions(newCaption);
    setNewCaption("");
  };

  return(
    <>
      <div className="bg-gray-200">
        <div className='bg-white p-4 w-[94%]'>
          <h1 className='py-2 px-4 bg-white font-bold'>Captions</h1>
          {group.captions.map((caption, i) => (
              <div className='bg-white px-4'>
                  <div className='flex gap-4 mr-4 mb-4'>
                    <input
                      className='py-2 px-2 bg-gray-200'
                      type="text"
                      placeholder={caption.C}
                    />
                    <input
                      className='py-2 px-2 bg-gray-200'
                      type="text"
                      placeholder={caption.V}
                    />
                  </div>
              </div>
              
              
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddCaption();
              }}
              className="mb-2"
            >

            <div className='grid grid-cols-2 mb-2'>
                <div className=''></div>
                <div className='flex justify-end'>
                    <button type="submit" className="translate-x-[.3rem] bg-indigo-700 text-white px-4 py-2">
                        <h1>Add Captions</h1>
                    </button>
                </div>
            
            </div>

              

            </form>
        </div>
            

            
          </div>
    </>
  )
  }
export default App
