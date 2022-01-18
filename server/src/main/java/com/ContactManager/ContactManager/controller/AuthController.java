package com.ContactManager.ContactManager.controller;


import com.ContactManager.ContactManager.DAO.ConfirmationTokenRepository;
import com.ContactManager.ContactManager.entity.ConfirmationToken;
import com.ContactManager.ContactManager.entity.Contacts;
import com.ContactManager.ContactManager.entity.User;
import com.ContactManager.ContactManager.holders.CallBackStatus;
import com.ContactManager.ContactManager.holders.UserData;
import com.ContactManager.ContactManager.service.EmailSenderService;
import com.ContactManager.ContactManager.service.UserService;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping("/user")
    public User getCurrentUser(Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();


        User user = userService.getUserByUsername(userDetails.getUsername());

        return user;

    }


    @GetMapping("/logout")
    public CallBackStatus logout(HttpServletRequest request,
                                 HttpServletResponse response) {

        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response,
                    authentication);
        }

        return new CallBackStatus(200,"OK");
    }

    @GetMapping("/prelogin")
    public String preLogIn(){
        return "ok";
    }


    @PostMapping("/signup")
    public CallBackStatus SignUpNewUser(@RequestBody User user){

        System.out.println(user);

        try {

            User existingUser = userService.FindUserByEmail(user.getEmailId());
            if(existingUser != null)
            {
                return new CallBackStatus(-401,"This email already exists!");
            }
            else
            {
                userService.CreateNewUser(user);

                ConfirmationToken confirmationToken = new ConfirmationToken(user);

                confirmationTokenRepository.save(confirmationToken);

                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setTo(user.getEmailId());
                mailMessage.setSubject("Complete Registration!");
                mailMessage.setFrom("vladkiev15@gmail.com");
                mailMessage.setText("To confirm your account, please click here : "
                        +"http://localhost:8080/auth/confirm-account?token="+confirmationToken.getConfirmationToken());

                emailSenderService.sendEmail(mailMessage);
                return new CallBackStatus(200,"OK");

            }

        } catch ( DataIntegrityViolationException e){
            return new CallBackStatus(-400,"User with this username already created");
        }



    }



    @RequestMapping(value="/confirm-account/{confirmationToken}", method= {RequestMethod.GET})
    public CallBackStatus confirmUserAccount( @PathVariable String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);


        System.out.println("token");

        if(token != null)
        {
            User user = userService.FindUserByEmail(token.getUser().getEmailId());
            user.setEnabled(true);
            userService.CreateNewUser(user);
            return new CallBackStatus(200,"ok");
        }
        else
        {
            return new CallBackStatus(-403,"The link is invalid or broken!");
        }

    }

}
