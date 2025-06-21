import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import CountUp from '../blocks/CountUp/CountUp';
import GradientText from '../blocks/GradientText/GradientText';

import { ArrowRight, MoveRight,Cpu, Globe, Cog, Users, Award, TrendingUp, Mail, Phone, MapPin, NotebookTabs } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col overflow-y-auto" >
      <div className="herosection text-center items-center flex flex-col gap-2 min-h-screen  justify-center px-4 bg-gradient-to-r from-greenc2i-100 via-bluec2i-100 to-orangec2i-100">
        <div className="title text-7xl sm:text-4xl md:text-6xl font-bold flex flex-col items-center gap-2">
          <div>C2I & Training: Expert Solutions In</div>
          <div className="py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
            <ReactRotatingText
              items={['Automation!', 'IoT Engineering!', 'Web Development!']}
              pause={1500}
            />
          </div>
        </div>
        <div className="subtext text-center w-2/3">Transforming businesses through innovative IoT solutions, cutting-edge web development, 
            and intelligent automation systems</div>
        <div className="buttons flex items-center gap-5 justify-center ">
          <button className='group flex items-center hover:shadow-lg transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-orange-500/80 px-5 py-2 rounded-md text-white font-semibold  '>Explore Our work
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className='border-black border-1 border px-5 py-2 rounded-md text-blackc2i-500 font-semibold hover:bg-white hover:border-white '>Contact Us</button>
        </div>
      </div>
      <div className="ourexpertise  flex flex-col justify-center min-h-screen bg-white px-4">
  <div className="flex justify-center py-5">
    <div className="title text-6xl font-bold inline-flex items-center gap-2">
      Our
      <div className="camelion py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
        Expertise
      </div>
    </div>
  </div>

  <div className="flex flex-wrap justify-center items-center gap-10 max-w-6xl mx-auto px-10">
    <div className="automation bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80  ">
      <div className='bg-gradient-to-r from-greenc2i-500 to-emerald-600 p-5 m-5 rounded-xl w-16'>
        <Cpu color="#ffffff" />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">Automation</h5>
        <p className="mb-3 text-blackc2i-100">
          Streamline operations with intelligent automation solutions and process optimization.
        </p>
        <a href="/iot" className="inline-flex items-center px-3 py-2 text-sm font-medium text-greenc2i-500">
          Learn more
          <MoveRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </div>


    <div className="iot bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80">
      <div className='bg-gradient-to-l from-bluec2i-500 to-bluec2i-900 p-5 m-5  rounded-xl w-16'>
        <Globe color="#ffffff" />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">IoT Engineering</h5>
        <p className="mb-3 text-blackc2i-100">
          Build connected systems and smart products with our IoT expertise.
        </p>
        <a href="/web-dev" className="inline-flex items-center px-3 py-2 text-sm font-medium text-bluec2i-500">
          Learn more
          <MoveRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </div>


    <div className="dev bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80">
      <div className='bg-gradient-to-r from-orangec2i-500 to-orange-700 p-5 m-5  rounded-xl w-16'>
        <Cog color="#ffffff" />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">Web Development</h5>
        <p className="mb-3 text-blackc2i-100">
          Develop modern, responsive websites and platforms tailored to your needs.
        </p>
        <a href="/automation" className="inline-flex items-center px-3 py-2 text-sm font-medium text-orangec2i-500">
          Learn more
          <MoveRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </div>
    
    
  </div>
  
      </div>
      <div className="somestuff flex flex-col ">
        <div className="anotherhero bg-gradient-to-r from-greenc2i-100 via-bluec2i-100 to-orangec2i-100">
          <div className="backdrop-blur-sm  flex justify-center items-center gap-24 py-24 px-4 sm:px-6 lg:px-8 min-h-full">
              <div className="clients flex flex-col items-center justify-center">
                  <div className='bg-white p-5 m-5 rounded-full w-16'>
                    <Users color="#8EC64C" />
                    </div>
                    <div className="number font-bold text-5xl"><CountUp from={0} to={150} separator="," direction="up" duration={1} className="count-up-text"/>+</div>
                    <div className="number font-bold text-lg">Happy Clients</div>
                  </div>
                  <div className="projects flex flex-col items-center justify-center">
                    <div className='bg-white p-5 m-5 rounded-full w-16'>
                    <Award  color="#F8B74C" />
                    </div>
                    <div className="number font-bold text-5xl"><CountUp from={0} to={30} separator="," direction="up" duration={1} className="count-up-text"/>+</div>
                    <div className="number font-bold text-lg">Project</div>
                  </div>
                  <div className="stats flex flex-col items-center justify-center">
                    <div className='bg-white p-5 m-5 rounded-full w-16'>
                    <TrendingUp color="#2379BA" />
                    </div>
                    <div className="number "><GradientText   colors={["#2379BA", "#8EC64C"]} animationSpeed={3} showBorder={false} className="font-bold text-5xl px-0.5" >90%</GradientText></div>
                    <div className="number font-bold text-lg">Success rate</div>
                  </div>
          </div>
    </div>
    <div className="anotherhero2 bg-gradient-to-r from-[#059669]/50 via-[#2469E4] to-[#EA580C]/50 flex justify-center flex-col items-center gap-10 py-24 px-4 sm:px-6 lg:px-8 min-h-fit">
      <div className="title text-5xl text-white font-bold">Ready to Transform Your Business?</div>
      <div className="subtitle text-white">Let’s discuss solutions for your business or create it using our expertise</div>
      <div className="buttons flex items-center justify-around px-24 gap-5">
        <button className='py-2 bg-white rounded-lg px-5'>Contact Us</button>
        <button className='py-2 text-white border-2 border-white rounded-lg px-5 '>Schedule a Call</button>
      </div>
    </div>
      </div>
      <div className="contact mb-5 ">
        <div className="flex justify-center flex-col items-center">
            <div className="title text-6xl font-bold inline-flex items-center gap-2">
              Get In
              <div className="camelion py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
                Touch
              </div>
            </div>
            <div className="soustitre">
              C2i empowers your IoT, web, and automation solutions seamlessly.
            </div>
        </div>
    <div className="grid grid-cols-2 my-2 mx-16">
      <div className="contact-info flex items-start flex-col justify-center gap-5 ">
        <div className="contactinfotext text-xl font-semibold">Contact Information</div>
        <div className="email flex gap-8 items-center">
          <div className="boxemail bg-greenc2i-100 p-2 rounded-md">
            <Mail color='#8EC64C' />
          </div>
          <div className="mails flex items-start flex-col ">
            <div className="p">contact@c2i.tn</div>
            <div className="p">info@c2i.tn</div>
          </div>
        </div>
        <div className="contact1 flex gap-10 justify-between items-center">
          <div className="boxemail bg-bluec2i-100 p-2 rounded-md">
            <Phone color='#2379BA' />
          </div>
          <div className="mails flex items-start flex-col ">
            <div className="p">+216 55 405 940</div>
            <div className="p">+216 53 258 794</div>
          </div>
        </div>
        <div className="contact2 flex gap-10 justify-between items-center">
          <div className="boxemail bg-bluec2i-100 p-2 rounded-md">
            <NotebookTabs color='#2379BA' />
          </div>
          <div className="mails flex items-start flex-col ">
            <div className="p">+216 55 420 543</div>
          </div>
        </div>
        <div className="place flex gap-10 justify-between items-center">
          <div className="boxemail bg-orangec2i-100 p-2 rounded-md">
            <MapPin color='#F8B74C' />
          </div>
          <div className="mails flex items-start flex-col ">
            <div className="p">El Zeouiet</div>
          </div>
        </div>
      </div>
      <div className="formcontact">
      <form class="max-w-sm mb-5 mx-auto">
        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium ">Name</label>
          <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 d" required />
        </div>
        <div class="mb-5">
          <label for="emaiil" class="block mb-2 text-sm font-medium">Email</label>
          <input type="emaiil" id="emaiil" class='bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5   placeholder:"name@c2i.tn" ' required />
        </div>
        <div class="mb-5">
          <label for="phone" class="block mb-2 text-sm font-medium">Phone Number</label>
          <input type="phone" id="phone" class="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark dark:" required />
        </div>
        <div class="mb-5">
          <label for="message" class="block mb-2 text-sm font-medium">Message</label>
          <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-gray-50 border px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
          </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label for="remember" class="ms-2 text-sm font-medium text-blackc2i-100">Remember me</label>
        </div>
        <button type="submit" class="text-white bg-bluec2i-500 hover:bg-bluec2i-900 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Send a message</button>
      </form>

      </div>
    </div>
  </div>
    </div>
  );
  
};

export default Home;
