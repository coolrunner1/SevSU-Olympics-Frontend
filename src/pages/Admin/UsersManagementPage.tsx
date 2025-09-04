/*import {useEffect, useState} from "react";
import {Table, Tbody, Th, Thead, Tr} from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//import {User} from "../../types/User.ts";
//import {fetchUsers} from "../../api/users.ts";
//import {useQuery} from "@tanstack/react-query";
//import {LoadingIndicator} from "../../components/Global/LoadingIndicator.tsx";
//import {AxiosError} from "axios";
//import {Pagination} from "../../components/Pagination/Pagination.tsx";
import {useLocation} from "react-router";
import {UserTableEntry} from "../../components/Admin/UsersManagement/UserTableEntry.tsx";
/*
export const UsersManagementPage = () => {
    const [users, setUsers] = useState<[]>([
        {id: 1}
    ]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [search, setSearch] = useState('');
    const location = useLocation();

    useEffect(() => {
        alert("Work in progress");
    }, []);

    /*const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryFn: fetchUsers,
        queryKey: ['users', page, itemsPerPage, search]
    });

    useEffect(() => {
        if (location.search === null || location.search === "" || location.search === "?") {
            setSearch('');
            return;
        }
        setSearch(location.search.slice(1));
    }, [location]);

    useEffect(() => {
        setUsers(data?.users);
    }, [data])

    const onNewClick = () => {
        if (users[0].user_id === NEW_ENTRY) {
            setUsers(users.splice(1));
            return;
        }
        setUsers([{
            user_id: NEW_ENTRY,
            role_id: 1,
            client_id: null,
            login: 'login',
            password: 'password',
            image_path: null,
            full_name: 'full name',
            email: 'email@example.com',
            phone_number: '+7777777777',
        }, ...users]);
    }

    return (
        <>
            <div>
                <div className="text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                        {'users'}
                    </h6>
                </div>
                <div className="flex flex-col items-center justify-center sm:px-4 py-4 overflow-auto">
                    {/*isLoading &&
                        <LoadingIndicator/>
                    }
                    {error && (error as AxiosError).status !== 404 &&
                        <div className="text-center text-xl">{error.message}</div>
                    }
                    {true/*!isLoading && !isError &&
                        <>
                            {!users?.length &&
                                <div className="text-center text-xl">{'no-users'}</div>
                            }
                            {users && users.length &&
                                <>
                                    <div className="w-full max-w-screen overflow-x-scroll">
                                        <Table className="bg-light-default dark:bg-dark-default w-full text-md shadow-md rounded mb-4" role="table">
                                            <Thead>
                                                <Tr className="border-b">
                                                    {
                                                        ['login', 'new-password', 'full-name', 'Email', 'phone-number', 'role', 'company']
                                                            .map((item, index) => (<Th key={index} role="columnheader">{item}</Th>))
                                                    }
                                                    <Th>
                                                        {/*<NewRemoveButtons id={users[0].user_id} onNewClick={onNewClick}/>}
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {users.map((user, index) => (
                                                    <UserTableEntry user={user} key={index} roles={[]} clients={[]}/>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </div>
                                    {/*<Pagination
                                        currentPage={page}
                                        setCurrentPage={setPage}
                                        pageCount={data?.pagination}
                                        itemsPerPage={itemsPerPage}
                                        setItemsPerPage={setItemsPerPage}
                                    />}
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}*/