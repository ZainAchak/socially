import { currentUser } from "@clerk/nextjs/server";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateTaskRequest {
  title: string;
}

let tasks: Task[] = [
    { id: 1, title: "Task One", completed: false },
    { id: 2, title: "Task Two", completed: true }
];

export async function GET() {
    // const user = await currentUser()
    // if(!user) return new Response("Unauthorized", {status: 401});
    return Response.json(tasks);
}

export async function POST(request: Request){
    try {
        const body: CreateTaskRequest = await request.json();
        if(!body.title){
            return Response.json({error:"Title is required"},{status: 400})
        }
        const newTask: Task = {
            id: tasks.length + 1,
            title: body.title,
            completed: false
        }
        tasks.push(newTask);
        return Response.json(newTask, {status: 201});
        
    } catch (error) {
        return Response.json({error: "Invalid request"},{status: 400});
    }
}