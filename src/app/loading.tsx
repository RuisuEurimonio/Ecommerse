import SpinnerItem from "@/components/LoadingItem/SpinnerItem";

type LoadingProps = {

}

const Loading : React.FC<LoadingProps> = () => {
    return (
        <section className="h-[80vh] w-full flex justify-center items-center">
                <SpinnerItem/>
        </section>
    )
}

export default Loading;