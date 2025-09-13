import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/componentsadmin/sidebar/Sidebar'
import { User } from '../../components/componentsadmin/users/User'
import { Loading } from '../../components/Loading';
import { Forbidden } from '../Forbidden';

export const UsersAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    setIsAuthorized(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />
  }

  if (!isAuthorized) {
    return <Forbidden />
  }

  return (
    <div className="bg-stone-200 min-h-screen flex">
        <Sidebar/>
        <main className="flex-1 p-4">
            <User/>
        </main>
    </div>
  )
}
