import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const useFollowUnfollow = (user) => {
	const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showToast = useShowToast();

	const handleFollowUnfollow = async () => {
		if (!currentUser) {
			showToast("Error", "Inicie sesión para seguir", "error");
			return;
		}
		if (updating) return;

		setUpdating(true);
		try {
			const res = await fetch(`/api/users/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			if (following) {
				showToast("Success", `Has dejado de seguir a ${user.name}`, "success");
				user.followers.pop(); // simular la eliminación de seguidores
			} else {
				showToast("Success", `Estas siguiendo a ${user.name}`, "success");
				user.followers.push(currentUser?._id); // Simular agregando a los seguidores
			}
			setFollowing(!following);

			console.log(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setUpdating(false);
		}
	};

	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;