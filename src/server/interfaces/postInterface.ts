export default interface Post{
    title: string,
    content: string,
    mediaID: string,
    mediaType: string,
    likes: number,
    comments: string[],
    author: string,
    createdAt: Date
}