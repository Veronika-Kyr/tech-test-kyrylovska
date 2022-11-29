import React, { useState, useEffect, Fragment } from "react";
import { fetchUsers, updateUsers } from "../features/usersSlice";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import '../styles/Table.scss';
import { IQuery } from "../interfaces/query";
import InfiniteScroll from "react-infinite-scroll-component";


enum COLUMNS {
    FIRST_NAME = 'First name',
    LAST_NAME = 'Last name',
    EMAIL = 'Email',
    AGE = 'Age',
    PHONE_NUMBER = 'Phone number',
}

const LABELS: { label: string }[] = [
    { label: COLUMNS.FIRST_NAME },
    { label: COLUMNS.LAST_NAME },
    { label: COLUMNS.EMAIL },
    { label: COLUMNS.AGE },
    { label: COLUMNS.PHONE_NUMBER },
];

const defaultQuery: IQuery = { page: '1', limit: '5' };


export default function Table() {
    const users = useAppSelector((state) => state.users);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers(defaultQuery));
        setPage(page + 1);

    }, [])

    async function fetchMoreData() {
        if (users.data.length >= 20) {
            setHasMore(false);
            return;
        }

        await fetch(`http://localhost:3000/users?_page=${page}&_limit=${defaultQuery.limit}`)
            .then((res) => res.json())
            .then((newUsers) => {
                if (newUsers.length === 0) {
                    setHasMore(false);
                    return;
                }
                const updatedUsersData = [...users.data, ...newUsers];
                dispatch(updateUsers(updatedUsersData));
                setPage(page + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="wrap">

            <div className="grid">

                <div className="fixed-top fixed-left" >
                    <p className="text">{LABELS[0].label}</p>
                </div>
                {LABELS.slice(1).map((l, i) => (
                    <div className="fixed-top" key={l.label}>
                        <p className="text">{l.label}</p>
                    </div>
                ))}
            </div>

            <InfiniteScroll
                className="infinite"
                dataLength={users.data.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                height={200}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>That's all</b>
                    </p>
                }
            >
                <div className="grid scroll">
                    {users.data.length > 0
                        && users.data.map((user) => (
                            <Fragment key={user.id}>
                                <div className="grid-cell fixed-left">{user.firstName || '-'}</div>
                                <div className="grid-cell">{user.lastName || '-'}</div>
                                <div className="grid-cell">{user.email || '-'}</div>
                                <div className="grid-cell" >{user.age || '-'}</div>
                                <div className="grid-cell"> {user.phoneNumber || '-'}</div>
                            </Fragment>
                        ))}
                </div>
            </InfiniteScroll>

            {
                (users.fetchStatus === 'loading') && <div className='loader'>
                    Loading data...
                </div>
            }

            {
                users.data.length === 0 && (
                    <div className="empty-list">No data.</div>
                )
            }
        </div>
    );
}