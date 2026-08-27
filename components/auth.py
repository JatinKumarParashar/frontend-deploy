import requests
import streamlit as st


def render_auth(backend_url: str) -> None:
    c1, c2, c3 = st.columns([1, 1.8, 1])
    with c2:
        st.markdown("""
        <div class="auth-box">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" width="150"/>
            <h2 style="margin-top:12px; margin-bottom:4px;">Spotify AI Memory Studio</h2>
            <p style="color:#B3B3B3 !important; font-size:13px;">Next-Gen Context-Aware Audio Engine</p>
        </div>
        """, unsafe_allow_html=True)

        auth_tab_login, auth_tab_signup = st.tabs(["🔑 Sign In", "✨ New User Sign Up"])
        with auth_tab_login:
            st.markdown("<br>", unsafe_allow_html=True)
            login_uid = st.text_input("User ID", value="user_1", key="login_uid")
            login_role = st.selectbox(
                "Operating Role",
                ["Normal User (Personalized Experience)", "Admin / Developer (Full Observability)"],
                key="login_role",
            )
            login_secret = ""
            if "Admin" in login_role:
                login_secret = st.text_input(
                    "Admin Secret Key", type="password", placeholder="Enter admin key...", key="login_secret"
                )
            if st.button("🚀 Sign In to Studio", use_container_width=True):
                try:
                    response = requests.post(
                        f"{backend_url}/auth/login",
                        json={
                            "user_id": login_uid.strip(),
                            "role": "Admin / Developer" if "Admin" in login_role else "Normal User",
                            "secret_key": login_secret,
                        },
                    )
                    if response.status_code == 200:
                        data = response.json()
                        st.session_state.logged_in = True
                        st.session_state.user_id = data.get("user_id", login_uid.strip())
                        st.session_state.username = data.get("full_name", login_uid.strip())
                        st.session_state.user_role = data.get("role", "User")
                        st.session_state.chat_messages = [{
                            "role": "assistant",
                            "content": f"Welcome back, {st.session_state.username}! Tell me what vibe, music, or podcast you're looking for today.",
                        }]
                        st.rerun()
                    else:
                        st.error(response.json().get("detail", "Login Failed"))
                except Exception as error:
                    st.error(f"Server Connection Error: {error}")

        with auth_tab_signup:
            st.markdown("<br>", unsafe_allow_html=True)
            signup_name = st.text_input("Full Name", key="reg_name")
            signup_uid = st.text_input("Choose User ID", key="reg_uid")
            signup_email = st.text_input("Email Address", key="reg_email")
            signup_phone = st.text_input("Mobile Number", key="reg_phone")
            otp_col, demo_col = st.columns([0.45, 0.55], vertical_alignment="center")
            with otp_col:
                if st.button("📲 Send OTP", use_container_width=True):
                    identifier = signup_phone.strip() or signup_email.strip()
                    if identifier:
                        try:
                            response = requests.post(
                                f"{backend_url}/auth/send-otp",
                                json={"phone_or_email": identifier},
                            )
                            if response.status_code == 200:
                                st.session_state.generated_otp_demo = response.json().get("demo_otp")
                                st.success("OTP Sent!")
                        except Exception as error:
                            st.error(f"Error: {error}")
                    else:
                        st.warning("Enter Email or Phone first.")
            with demo_col:
                if st.session_state.generated_otp_demo:
                    st.info(f"Demo OTP: **{st.session_state.generated_otp_demo}**")
            signup_otp = st.text_input("Enter OTP Code", key="reg_otp")
            if st.button("🎉 Verify & Create Profile", use_container_width=True):
                if signup_name and signup_uid and (signup_email or signup_phone) and signup_otp:
                    try:
                        response = requests.post(
                            f"{backend_url}/auth/register",
                            json={
                                "user_id": signup_uid.strip(),
                                "full_name": signup_name.strip(),
                                "email": signup_email.strip(),
                                "phone": signup_phone.strip(),
                                "otp": signup_otp.strip(),
                            },
                        )
                        if response.status_code == 200:
                            st.success("Profile Created! Switch to Sign In tab to log in.")
                        else:
                            st.error(response.json().get("detail", "Registration Failed"))
                    except Exception as error:
                        st.error(f"Error: {error}")
                else:
                    st.error("Fill all fields and verify OTP.")

    st.stop()
