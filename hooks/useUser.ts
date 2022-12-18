import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

const useUser = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<any>(null);

  const [user, setUser] = useState<any>(null);

  const getSession = async () => {
    const supabaseSession = await supabase.auth.getSession();
    return supabaseSession;
  };

  
  useEffect(() => {
    (async () => {
      const supabaseSession = await getSession();
      if (supabaseSession.data.session?.user) {
        setUser(supabaseSession.data.session.user);
        setToken(supabaseSession.data.session.access_token);
      }
      setLoading(false);
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user?.id) {
          setUser(session.user);
          setToken(session.access_token);
        }
        setLoading(false);
      });
    })();
  }, [supabase]);
  return {
    user,
    isLoading,
    token,
  };
};
export default useUser;
