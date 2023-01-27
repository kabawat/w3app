import axios from 'axios'
import dp from '../assets/user_dp/dp1.jpg'
import React from 'react'
import { Image } from '../style.js'
import { SubTitle, AddUser, SearchContainer, NewUserName, AddUserHeading, ContactList, ContactItem, NewUserDp, TagLine, NewUserModale, } from './modale.style.js'
import { useDispatch, useSelector } from 'react-redux'
import { contactList } from '../redux/action'
import { BASE_URL } from '../domain'
const NewChatModal = ({ state }) => {
    const { profile } = useSelector(state => state.myProfile)
    const { userList, mouse } = state
    const Dispatch = useDispatch()
    const userHandal = async (payload) => {
        const id = `2917-room-id.${new Date().getTime()}`
        await axios.post(`${BASE_URL}/newchat`, {
            _room: id,
            sender: profile.email,
            receiver: payload.email,
        })
        const result = await axios.get(`${BASE_URL}/userChat?sender=${profile.email}`)
        const { data } = await result.data
        Dispatch(contactList(data))
    }
    return (
        <NewUserModale id="newChatModal">
            <SearchContainer left={mouse.x} top={mouse.y}>
                <SubTitle>New Chat</SubTitle>
                <AddUser id='isAdd' />
                <AddUserHeading>
                    All Contact
                </AddUserHeading>
                <ContactList>
                    {
                        userList ? userList.map((curUser) => {
                            return <ContactItem key={curUser._id} onClick={() => userHandal(curUser)}>
                                <NewUserDp>
                                    <Image src={dp} />
                                </NewUserDp>
                                <div>
                                    <NewUserName>
                                        {curUser.user}
                                    </NewUserName>
                                    <TagLine>
                                        {curUser.email}
                                    </TagLine>
                                </div>
                            </ContactItem>
                        }) : ''
                    }
                </ContactList>
            </SearchContainer>
        </NewUserModale>
    )
}

export default NewChatModal