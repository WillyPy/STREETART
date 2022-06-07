// Generated by view binder compiler. Do not edit!
package com.example.streetart.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.streetart.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class FragmentSecondBinding implements ViewBinding {
  @NonNull
  private final ConstraintLayout rootView;

  @NonNull
  public final Button buttonSecond;

  @NonNull
  public final TextView textviewSecond;

  private FragmentSecondBinding(@NonNull ConstraintLayout rootView, @NonNull Button buttonSecond,
      @NonNull TextView textviewSecond) {
    this.rootView = rootView;
    this.buttonSecond = buttonSecond;
    this.textviewSecond = textviewSecond;
  }

  @Override
  @NonNull
  public ConstraintLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static FragmentSecondBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static FragmentSecondBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.fragment_second, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static FragmentSecondBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.button_second;
      Button buttonSecond = ViewBindings.findChildViewById(rootView, id);
      if (buttonSecond == null) {
        break missingId;
      }

      id = R.id.textview_second;
      TextView textviewSecond = ViewBindings.findChildViewById(rootView, id);
      if (textviewSecond == null) {
        break missingId;
      }

      return new FragmentSecondBinding((ConstraintLayout) rootView, buttonSecond, textviewSecond);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}
