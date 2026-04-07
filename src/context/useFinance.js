import { useContext } from "react";
import FinanceContext from "./FinanceContext";

const useFinance = () => {
 return useContext(FinanceContext);
};

export default useFinance;