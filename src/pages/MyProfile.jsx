import React, { useEffect, useState } from 'react'
import Head from '../components/Head'
import { Footer } from '../components/Footer'
import { ChevronDownIcon } from 'lucide-react'
import { getUserById } from '../api/user'
import { getProfile, updateProfile } from '../api/profile'
import { Loading } from '../components/Loading'
import { Forbidden } from './Forbidden'

export const MyProfile = () => {
  const [user, setUser] = useState({name: "", email: ""});
  const [profile, setProfile] = useState({
    phone: "",
    gender: "",
    date_of_birth: "",
    shipping_address: "",
    photo: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token || role !== "user") {
      setIsLoggedIn(false);
      setLoading(false);
      return
    }

    setIsLoggedIn(true);

    const fetchData = async () => {
      try {
        const [userData, profileData] = await Promise.all([
          getUserById(),
          getProfile(),
        ]);
        setUser(userData);
        setProfile(profileData || {
          phone: "",
          gender: "",
          date_of_birth: "",
          shipping_address: "",
          photo: "",
        });
      } catch (err) {
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />
  }

  if (!isLoggedIn) {
    return <Forbidden />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = await updateProfile(user.id, {
        phone: profile.phone,
        gender: profile.gender,
        date_of_birth: profile.date_of_birth,
        shipping_address: profile.shipping_address,
        photo: profile.photo,
      });

      setProfile(updatedProfile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile: ", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className='bg-white'>
      <Head />
      <div className='flex flex-col lg:flex-row justify-center gap-8 py-12'>
        <div className='w-full lg:w-96 bg-gray-50 p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-4'>Photo Profile</h3>

          <div className='w-40 h-40 mx-auto mb-4'>
            <img
              src={
                profile.photo
                  ? `http://localhost:8000/storage/profile_photos/${profile.photo}`
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt={user.name}
              className='w-full h-full rounded-lg object-cover shadow'
            />
          </div>

          <label className='block'>
            <input 
              type="file" 
              className='hidden' 
              accept='.jpg, .jpeg, .png' 
              onChange={(e) => setProfile({ ...profile, photo: e.target.files[0] })}
            />
            <div className='w-64 mx-auto cursor-pointer bg-indigo-600 rounded-md text-white text-center shadow px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-700'>
              Change Photo
            </div>
          </label>

          <p className='mt-3 text-xs text-gray-600'>
            File weight: max 2MB. <br />
            Extension file: <b>JPG, JPEG, PNG</b>
          </p>
        </div>

        <div className='w-full lg:w-[48rem] bg-gray-50 p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Data Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    value={profile.gender || ""}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.date_of_birth || ""}
                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea
                  rows="3"
                  value={profile.shipping_address || ""}
                  onChange={(e) => setProfile({ ...profile, shipping_address: e.target.value })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
              </div>

              {/* Button Save */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-64 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
                >
                  Save Profile
                </button>
              </div>
            </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}