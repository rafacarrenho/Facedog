import React, {
  createContext,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./Api";
import { useNavigate } from "react-router-dom";

export type Photo = {
  id: string;
  src: string;
  title: string;
  acessos: string;
  author: string;
  peso: string;
  idade: string;
};

type Comment = {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
};

export type Data = {
  username: string;
  photo: Photo;
  comments: Comment[];
  nome: string;
  id: string;
};

type UserStorageType = {
  userLogin: (username: string, password: string) => void;
  userLogout: MouseEventHandler<HTMLButtonElement>;
  data: Data | null;
  error: boolean;
  loading: boolean;
  login: boolean;
};

export const UserContext = createContext<UserStorageType>(
  {} as UserStorageType
);

export const UserStorage: React.FC = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setData(null);
      setError(false);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(false);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("conta");
    } catch (err: any) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(false);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
