

export default async function ProfilePage({params}:{params:{username:string}}) {
    // throw new Error("Error in profile page")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return <p>Profile: {params.username}</p>
}
