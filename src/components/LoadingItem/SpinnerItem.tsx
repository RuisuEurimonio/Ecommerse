import style from "./styles.module.css";;

const SpinnerItem = () => {
    return (
        <div className="flex mt-4 justify-center">
            <div className={style.loaderSpinner} ></div>
        </div>
    )
}

export default SpinnerItem;