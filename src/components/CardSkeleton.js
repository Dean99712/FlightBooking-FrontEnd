import React from 'react';
import Skeleton from "react-loading-skeleton";
import "../styles/CardSkeleton.scss";

const CardSkeleton = ({cards}) => {
    return (
        Array(cards).fill(0).map((_, i) =>
            <div key={i} className="card-skeleton">
                <div className="card-skeleton-container">

                    <div className="duration-container">
                        <p><Skeleton count={1} width={200}/></p>
                    </div>

                    <div className="container">
                        <p><Skeleton count={1} width={75}/></p>
                        <p><Skeleton count={1} width={100}/></p>
                        <p><Skeleton count={1} width={50}/></p>
                    </div>

                    <div className="destination-container">
                        <p><Skeleton count={1} width={100} containerClassName={'destination-container'}/></p>
                    </div>

                    <div className="container">
                        <p><Skeleton count={1} width={75}/></p>
                        <p><Skeleton count={1} width={100}/></p>
                        <p><Skeleton count={1} width={50}/></p>
                    </div>


                    <div className="checkout-container">
                        <p><Skeleton count={1}/></p>
                        <p><Skeleton count={1}/></p>
                        <p><Skeleton count={1}/></p>
                        <Skeleton className="button" containerClassName={'checkout-container'} width={215} height={35}/>
                    </div>
                </div>
            </div>)

    );

};

export default CardSkeleton;
