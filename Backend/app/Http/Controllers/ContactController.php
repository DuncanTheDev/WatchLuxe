<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::raw(
            "
            You have received a new message from WatchLuxe Contact Form.

            Name: {$validated['name']}
            Email: {$validated['email']}

            Message:
            {$validated['message']}
        ",
            function ($mail) use ($validated) {
                $mail->to('patrickduncandb@gmail.com')
                    ->subject('New Contact Form Submission from ' . $validated['name']);
            }
        );

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
