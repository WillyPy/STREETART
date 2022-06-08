package com.streetsa

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.streetsa.databinding.ActivityLoginBinding

import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class LoginActivity: AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val et_user_name = findViewById(R.id.et_user_name) as EditText
        val et_password = findViewById(R.id.et_password) as EditText
        val btn_submit = findViewById(R.id.btn_submit) as Button
        val usersApi = RetrofitHelper.getInstance().create(UsersApi::class.java)


        // set on-click listener
        btn_submit.setOnClickListener {
            val user_name = et_user_name.toString();
            val user_password = et_password.toString();
            Toast.makeText(this@LoginActivity, user_name, Toast.LENGTH_LONG).show()

            GlobalScope.launch() {
               }


        }

    }
}