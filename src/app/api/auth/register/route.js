import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const data = await request.json()
        console.log("data: ", data);
        const emailFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })


        if (emailFound) {
            return NextResponse.json(
                { message: "email already exist" },
                { status: 400 }
            );
        }

        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username,
            }
        })
        if (usernameFound) {
            return NextResponse.json(
                { message: "username already exist" },
                { status: 400 }
            );
        }


        data.password = await bcrypt.hash(data.password, 10);
        
        const newUser = await db.user.create({
            data
        })

        const { password: _, ...user } = newUser
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {status: 500})
    }
}
