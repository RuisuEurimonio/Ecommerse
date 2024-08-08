import style from "./styles.module.css";

const LoadingItem : React.FC<{}> = () =>{
    return (
        <div className="flex items-center justify-center">
            <div className={style.loader}></div>
        </div>
)
}

export default LoadingItem;